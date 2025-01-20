import React, { useState } from 'react';
import { isObject, isArray, isFunction } from '../../utils/helpers';
import { TriangleRight } from '../../icons';

export type NodeType = object | Function | string | number | boolean | null;

type JsonTreeViewProps = {
  data: Record<string, NodeType>;
  backgroundColorClass?: string;
  textColorClass?: string;
  isDefaultExpanded?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const JsonTreeView = ({
  data,
  backgroundColorClass,
  textColorClass,
  isDefaultExpanded = true,
}: JsonTreeViewProps) => {
  const renderTree = (
    node: NodeType,
    keyPath: string = '',
    masterNode: boolean = false,
  ) => {
    if (typeof node === 'object' && node !== null) {
      return (
        <div className={` ${!masterNode ? 'ml-4 border-l pl-4' : ''} `}>
          {Object.entries(node).map(([key, value]) => (
            <TreeNode
              key={keyPath + key}
              nodeKey={key}
              value={value}
              keyPath={keyPath + key}
              isDefaultExpanded={isDefaultExpanded}
              textColorClass={textColorClass}
            />
          ))}
        </div>
      );
    }
    return <span className="text-gray-600"> {String(node)}</span>;
  };

  const TreeNode: React.FC<{
    nodeKey: string;
    value: NodeType;
    keyPath: string;
    isDefaultExpanded?: boolean;
    className?: string;
    textColorClass?: string;
  }> = ({
    nodeKey,
    value,
    keyPath,
    isDefaultExpanded,
    className,
    textColorClass = 'white',
  }) => {
    const [expanded, setExpanded] = useState(isDefaultExpanded);
    const isExpandable = typeof value === 'object' && value !== null;

    return (
      <div className="flex flex-col space-y-1">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => isExpandable && setExpanded((prev) => !prev)}
        >
          {isExpandable && (
            <span
              className={`mr-2 transition-transform ${
                expanded ? 'rotate-90' : ''
              }`}
            >
              <TriangleRight
                height={20}
                width={20}
                stroke="transparent"
                fill={textColorClass}
                className={className}
              />
            </span>
          )}
          {!isFunction(value) ? (
            <>
              <span className="font-semibold">
                {nodeKey}
                {isArray(value) ? isArray(value) : isObject(value)}:
              </span>
              {!isExpandable && <span className="ml-2">{String(value)}</span>}
            </>
          ) : null}
        </div>
        {expanded && isExpandable && renderTree(value, keyPath)}
      </div>
    );
  };

  return (
    <div className={`p-4 ${backgroundColorClass} ${textColorClass} rounded`}>
      {renderTree(data, '', true)}
    </div>
  );
};

export default JsonTreeView;
