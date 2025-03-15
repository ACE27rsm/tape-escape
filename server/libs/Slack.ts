import {
  IncomingWebhook,
  type IncomingWebhookSendArguments,
  type IncomingWebhookHTTPError,
} from "@slack/webhook";
import { isAxiosError } from "axios";
import createDebug from "debug";

/// * utils
import sleep from "../utils/sleep";

/// * static
import config from "../config";

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

      let counter = 0;
      const task = async () => {
        try {
          await this.notifier.send(data);
        } catch (error: any) {
          const errorMessage = error.message;
          this.debug(errorMessage);

          if (counter >= 5) {
            throw error;
          } else {
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
              throw error;
            }
          }
        }
      };

      await task();
    } catch (error: any) {
      this.debug(
        "Failed to send slack notification after 5 retries: %s",
        error.message
      );
    }
  }
}

export default Slack;
