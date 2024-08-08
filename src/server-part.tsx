import React, { ReactNode, Suspense, useMemo } from 'react';
import { ClientComponent, SuspenseData } from './client-part';
export { ClientComponentProps } from './client-part';

async function DataContent({ dataPromise }: { dataPromise: Promise<unknown> }) {
  const data = await dataPromise;

  return <>{JSON.stringify(data)}</>;
}

type DataToPromise<T> = {
  [K in keyof T]-?: Promise<NonNullable<T[K]>>;
};

export interface NextDataStreamingProps<
  Data extends Record<string, unknown>,
  DataStream extends Record<string, unknown>,
> {
  data: Data;
  dataStream: DataToPromise<Partial<DataStream>>;
  ClientComponent: ClientComponent<Data, DataStream>;
}

export const NextDataStreaming = <Data extends Record<string, unknown>, DataStream extends Record<string, unknown>>({
  data,
  dataStream,
  ClientComponent,
}: NextDataStreamingProps<Data, DataStream>) => {
  const dataStreamSuspenseNodes = useMemo(
    () =>
      Object.entries(dataStream ?? {}).reduce<Record<keyof DataStream, ReactNode>>(
        (acc, [key, dataPromise]) => ({
          ...acc,
          [key]: (
            <Suspense>
              <DataContent dataPromise={dataPromise} />
            </Suspense>
          ),
        }),
        {} as Record<keyof DataStream, ReactNode>,
      ),
    [dataStream],
  );

  return (
    <SuspenseData data={data} dataStreamSuspenseNodes={dataStreamSuspenseNodes} ClientComponent={ClientComponent} />
  );
};
