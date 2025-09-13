'use client'

export default function CinchFilters() {
  return (
    <svg
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Liquid Distortion Filter */}
        <filter id="liquid-distortion">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="3"
            result="noise"
            seed="1"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Liquid Distortion Hover Filter */}
        <filter id="liquid-distortion-hover">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="5"
            result="noise"
            seed="2"
          >
            <animate
              attributeName="baseFrequency"
              values="0.02;0.05;0.02"
              dur="2s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="15"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* General Distortion Filter */}
        <filter id="distortion-filter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01"
            numOctaves="1"
            result="turbulence"
          >
            <animate
              attributeName="baseFrequency"
              values="0.01;0.02;0.01"
              dur="8s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Glitch Filter */}
        <filter id="glitch-filter">
          <feColorMatrix
            type="saturate"
            values="1"
            result="saturated"
          >
            <animate
              attributeName="values"
              values="1;3;1"
              dur="0.2s"
              repeatCount="indefinite"
            />
          </feColorMatrix>
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="1 0 1 0 1 0 1 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="0.5" />
        </filter>

        {/* Chromatic Aberration */}
        <filter id="chromatic-aberration">
          <feOffset in="SourceGraphic" dx="2" dy="0" result="red">
            <animate
              attributeName="dx"
              values="2;-2;2"
              dur="4s"
              repeatCount="indefinite"
            />
          </feOffset>
          <feColorMatrix in="red" type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="red-channel"
          />
          
          <feOffset in="SourceGraphic" dx="-2" dy="0" result="cyan">
            <animate
              attributeName="dx"
              values="-2;2;-2"
              dur="4s"
              repeatCount="indefinite"
            />
          </feOffset>
          <feColorMatrix in="cyan" type="matrix"
            values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
            result="cyan-channel"
          />
          
          <feBlend mode="screen" in="red-channel" in2="cyan-channel" />
        </filter>

        {/* Noise Pattern */}
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            seed="5"
          />
          <feColorMatrix type="saturate" values="0"/>
        </filter>

        {/* Blur Effect */}
        <filter id="motion-blur">
          <feGaussianBlur stdDeviation="3,0">
            <animate
              attributeName="stdDeviation"
              values="0,0;3,0;0,0"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </feGaussianBlur>
        </filter>
      </defs>
    </svg>
  )
}