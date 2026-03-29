export async function imageUrlToBuffer(url: string): Promise<Buffer<ArrayBuffer> | null> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(2000)
  });
  if (!response.ok) {
    return null;
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
