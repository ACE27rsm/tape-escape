import {
  IncomingWebhook,
  type IncomingWebhookSendArguments,
  type IncomingWebhookHTTPError,
} from "@slack/webhook";
import { isAxiosError } from "axios";
import createDebug from "debug";
import pRetry, { FailedAttemptError, AbortError } from "p-retry";

/// * utils
import sleep from "../utils/sleep";

/// * static
import config from "../config";

type RetryIncomingWebhookHTTPError =
  | FailedAttemptError
  | IncomingWebhookHTTPError;

class Slack {
  /// y ***********************************
  private static notifier = new IncomingWebhook(config.slack.webhookUrl);
  private static debug = createDebug("debug:slack");

  /// g ***********************************
  static async sendNotification(
    data: IncomingWebhookSendArguments
  ): Promise<void> {
    try {
      if (!config.slack.enabled) {
        return;
      }

      await pRetry(() => this.notifier.send(data), {
        retries: 5,
        onFailedAttempt: async (error: RetryIncomingWebhookHTTPError) => {
          const errorMessage = error.message;
          this.debug(errorMessage);

          const webhookError = error as IncomingWebhookHTTPError;

          if (
            isAxiosError(webhookError.original) &&
            webhookError.original.response
          ) {
            if (webhookError.original.response.status === 429) {
              const seconds =
                webhookError.original.response.headers["retry-after"];
              await sleep(seconds * 1000);
            }
          } else {
            throw new AbortError(errorMessage);
          }
        },
      });
    } catch (error: any) {
      this.debug(
        "Failed to send slack notification after 5 retries: %s",
        error.message
      );
    }
  }
}

export default Slack;
