'use client';

import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { JSX } from 'react/jsx-runtime';

interface DataParserProps {
  nodeKey: string;
  suspenseData: ReactNode;
  onChange: (nodeKey: string, data: unknown) => void;
}

const DivStyle = { display: 'none' };

export const DataParser = ({ nodeKey, suspenseData, onChange }: DataParserProps) => {
  const dataRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dataElement = dataRef.current;

    if (!dataElement) return;

    const checkData = () => {
      const textContent = dataElement.textContent;

      if (!textContent) return;
      if (textContent.trim() === '') return;

      try {
        onChange(nodeKey, JSON.parse(textContent));
      } catch (e) {
        console.error(e);
      }
    };

    checkData();

    const observer = new MutationObserver(checkData);

    observer.observe(dataElement, { characterData: true, subtree: true });

    return () => observer.disconnect();
  }, [nodeKey, onChange]);

  return (
    <div ref={dataRef} style={DivStyle}>
      {suspenseData}
    </div>
  );
};

export interface ClientComponentProps<
  Data extends Record<string, unknown>,
  DataStream extends Record<string, unknown>,
> {
  data: Data;
  dataStream: Partial<DataStream>;
}

export type ClientComponent<Data extends Record<string, unknown>, DataStream extends Record<string, unknown>> = (
  props: ClientComponentProps<Data, DataStream>,
) => JSX.Element;

export interface SuspenseData<Data extends Record<string, unknown>, DataStream extends Record<string, unknown>> {
  data: Data;
  dataStreamSuspenseNodes: Record<keyof DataStream, ReactNode>;
  ClientComponent: ClientComponent<Data, DataStream>;
}

export const SuspenseData = <Data extends Record<string, unknown>, DataStream extends Record<string, unknown>>({
  data,
  dataStreamSuspenseNodes,
  ClientComponent,
}: SuspenseData<Data, DataStream>) => {
  const [dataStream, setDataStream] = useState<Partial<DataStream>>({});

  const handleChange = useCallback(
    (key: string, dataStream: unknown) => setDataStream((prev) => ({ ...prev, [key]: dataStream })),
    [],
  );

  return (
    <>
      {Object.entries(dataStreamSuspenseNodes).map(([key, suspenseData]) => (
        <DataParser key={key} nodeKey={key} suspenseData={suspenseData} onChange={handleChange} />
      ))}
      <ClientComponent data={data} dataStream={dataStream} />
    </>
  );
};
