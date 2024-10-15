import React, { useState } from 'react';
import { BuilderBlocks } from '@builder.io/react';

function Tabs(props: { tabs: any[]; builderBlock: { id: string | undefined; }; }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div
        style={{
          display: 'flex',
          overflow: 'auto',
        }}
      >
        {props.tabs?.map((item: { label: React.ReactNode; }, index: number) => (
          <span
            key={index}
            style={{
              padding: 20,
              color: activeTab === index ? 'blue' : '#000',
            }}
            onClick={() => {
              setActiveTab(index);
            }}
          >
            {item.label}
          </span>
        ))}
      </div>
      {props.tabs?.length && (
        <BuilderBlocks
          parentElementId={props.builderBlock.id}
          dataPath={`component.options.tabs.${activeTab}.content`}
          blocks={props.tabs[activeTab].content}
        />
      )}
    </>
  );
}

export default Tabs;
