'use client';

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { JSX } from 'react/jsx-runtime';

interface DataParserProps {
  nodeKey: string;
  suspenseData: ReactNode;
  onChange: (nodeKey: string, data: any) => void;
}

const DivStyle = { display: 'none' };

export const DataParser = ({
  nodeKey,
  suspenseData,
  onChange,
}: DataParserProps) => {
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

interface SuspenseData<Data extends Record<string, unknown>> {
  suspenseDataNodes: Record<keyof Data, ReactNode>;
  ClientComponent: (props: Partial<Data>) => JSX.Element;
}

export const SuspenseData = <Data extends Record<string, unknown>>({
  suspenseDataNodes,
  ClientComponent,
}: SuspenseData<Data>) => {
  const [data, setData] = useState<Partial<Data>>({});

  const handleChange = useCallback(
    (key: string, data: any) => setData((prev) => ({ ...prev, [key]: data })),
    []
  );

  return (
    <>
      {Object.entries(suspenseDataNodes).map(([key, suspenseData]) => (
        <DataParser
          key={key}
          nodeKey={key}
          suspenseData={suspenseData}
          onChange={handleChange}
        />
      ))}
      <ClientComponent {...data} />
    </>
  );
};
