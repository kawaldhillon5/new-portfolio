
export const PhoneSvg = ({width, height, color}: {width: number, height: number, color:string})=>{
    return (
      <div className="phone-svg-div">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}  
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="phone-svg"
        >
        {/* Phone outer frame */}
        <rect
          x="10"
          y="10"
          width={width - 20}
          height={height - 20}
          rx="50"
          stroke={color}
          strokeWidth="10"
          fill="none"
        />
        
        {/* Left side buttons */}
        <rect
          x="0"
          y="120"
          width="10"
          height="50"
          rx="5"
          fill={color}
        />
        <rect
          x="0"
          y="190"
          width="10"
          height="80"
          rx="5"
          fill={color}
        />
        <rect
          x="0"
          y="290"
          width="10"
          height="80"
          rx="5"
          fill={color}
        />
        
        {/* Right side button */}
        <rect
          x={width-10}
          y="200"
          width="10"
          height="100"
          rx="5"
          fill={color}
        />
      </svg>
    </div>
    )
}

