function delay(ms?: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms || 1000);
  });
}

export default delay;
