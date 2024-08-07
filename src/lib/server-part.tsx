import React, { ReactNode, Suspense, useMemo } from 'react';
import { SuspenseData } from './client-part';

async function DataContent({ dataPromise }: { dataPromise: Promise<any> }) {
  const data = await dataPromise;

  return <>{JSON.stringify(data)}</>;
}

type DataToPromise<T> = {
  [K in keyof T]-?: Promise<NonNullable<T[K]>>;
};

export interface NextDataStreamingProps<Data extends Record<string, unknown>> {
  dataPromises: DataToPromise<Data>;
  ClientComponent: (props: Partial<Data>) => JSX.Element;
}

export const NextDataStreaming = <Data extends Record<string, unknown>>({
  dataPromises,
  ClientComponent,
}: NextDataStreamingProps<Data>) => {
  const suspenseDataNodes = useMemo(
    () =>
      Object.entries(dataPromises).reduce<Record<keyof Data, ReactNode>>(
        (acc, [key, dataPromise]) => ({
          ...acc,
          [key]: (
            <Suspense>
              <DataContent dataPromise={dataPromise} />
            </Suspense>
          ),
        }),
        {} as Record<keyof Data, ReactNode>
      ),
    [dataPromises]
  );

  return (
    <SuspenseData
      suspenseDataNodes={suspenseDataNodes}
      ClientComponent={ClientComponent}
    />
  );
};
