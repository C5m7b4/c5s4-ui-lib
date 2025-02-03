interface DebuggerIconProps {
  stroke: string;
  height: number;
  width: number;
  strokeWidth: number;
}

const DebuggerIcon = ({
  height,
  width,
  stroke,
  strokeWidth,
}: DebuggerIconProps) => {
  const legStrokeWidth = 20;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={`${height}px`}
      width={`${width}px`}
      stroke={stroke}
      strokeWidth={strokeWidth}
      version="1.1"
      viewBox="0 0 512 512"
      //   fill="transparent"
    >
      <g>
        <g>
          <ellipse cx="243.5" cy="255.5" rx="107" ry="136" />
          <ellipse cx="243.5" cy="98.5" rx="55" ry="61" />
          <g>
            <line
              strokeWidth={legStrokeWidth}
              x1="332.5"
              y1="179.5"
              x2="394.5"
              y2="149.5"
            />
            <line
              strokeWidth={legStrokeWidth}
              x1="425.5"
              y1="83.5"
              x2="394.5"
              y2="149.5"
            />
          </g>
          <g>
            <line
              strokeWidth={legStrokeWidth}
              x1="350.5"
              y1="270.5"
              x2="412.5"
              y2="240.5"
            />
            <line
              strokeWidth={legStrokeWidth}
              x1="443.5"
              y1="174.5"
              x2="412.5"
              y2="240.5"
            />
          </g>
          <g>
            <line
              strokeWidth={legStrokeWidth}
              x1="137.5"
              y1="270.5"
              x2="75.5"
              y2="240.5"
            />
            <line
              strokeWidth={legStrokeWidth}
              x1="44.5"
              y1="174.5"
              x2="75.5"
              y2="240.5"
            />
          </g>
          <g>
            <line
              strokeWidth={legStrokeWidth}
              x1="155.5"
              y1="179.5"
              x2="93.5"
              y2="149.5"
            />
            <line
              strokeWidth={legStrokeWidth}
              x1="62.5"
              y1="83.5"
              x2="93.5"
              y2="149.5"
            />
          </g>
          <g>
            <line
              strokeWidth={legStrokeWidth}
              x1="62.5"
              y1="429.5"
              x2="124.5"
              y2="399.5"
            />
            <line
              strokeWidth={legStrokeWidth}
              x1="155.5"
              y1="333.5"
              x2="124.5"
              y2="399.5"
            />
          </g>
          <g>
            <line
              strokeWidth={legStrokeWidth}
              x1="425.5"
              y1="429.5"
              x2="363.5"
              y2="399.5"
            />
            <line
              strokeWidth={legStrokeWidth}
              x1="332.5"
              y1="333.5"
              x2="363.5"
              y2="399.5"
            />
          </g>
          <circle cx="223.5" cy="73.5" r="6" />
          <circle cx="263.5" cy="73.5" r="6" />
          <line
            strokeWidth={legStrokeWidth}
            x1="243.5"
            y1="89.5"
            x2="229.5"
            y2="106.5"
          />
          <line
            strokeWidth={legStrokeWidth}
            x1="248.5"
            y1="108.5"
            x2="229.5"
            y2="106.5"
          />
          <ellipse cx="204.5" cy="208" rx="13" ry="19.5" />
          <ellipse cx="295" cy="217.5" rx="11.5" ry="22" />
          <ellipse cx="293" cy="324" rx="9.5" ry="18.5" />
          <ellipse cx="248" cy="269" rx="9.5" ry="18.5" />
          <ellipse cx="195" cy="324" rx="12.5" ry="20.5" />
        </g>
      </g>
    </svg>
  );
};

export default DebuggerIcon;
