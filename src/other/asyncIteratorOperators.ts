export async function isEmpty(asyncGenerator: AsyncGenerator<any, any, any>) {
  for await (const _ of asyncGenerator) {
    return false;
  }
  return true;
}

export async function* takeWhile<T>(
  asyncGenerator: AsyncGenerator<T, any, any>,
  criteria: (value: T) => Promise<boolean>
) {
  for await (const value of asyncGenerator) {
    if (await criteria(value)) yield value;
    else return;
  }
}

export async function* filter<T>(
  asyncGenerator: AsyncGenerator<T, any, any>,
  criteria: (value: T) => Promise<boolean>
) {
  for await (const value of asyncGenerator) {
    if (await criteria(value)) yield value;
  }
}
