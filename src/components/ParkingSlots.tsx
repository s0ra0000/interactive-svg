"use client";
import React, { useState } from "react";

const ParkingSlots = () => {
  const [selectedSlots, setSelectedSlots] = useState(Array(68).fill(false));

  const toggleSlot = (index: any) => {
    setSelectedSlots((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = !newSelected[index];
      return newSelected;
    });
  };

  return (
    <svg
      width="1200"
      height="800"
      xmlns="http://www.w3.org/2000/svg"
      fill="blue"
    >
      {/* Top Parking Slots */}
      {selectedSlots.slice(0, 16).map((isSelected, index) => (
        <g key={`top-${15 - index}`} onClick={() => toggleSlot(index)}>
          <rect
            x={index * 65 + 160}
            y="10"
            width="55"
            height="110"
            fill={isSelected ? "#939391" : "#e7e7e7"}
            style={{ cursor: "pointer" }}
          />
          <text
            x={160 + index * 65 + 25}
            y="65"
            fontSize="18"
            fill="#666"
            textAnchor="middle"
          >
            {15 - index + 1}
          </text>
        </g>
      ))}
      {/* Left Parking Slots */}
      {selectedSlots.slice(16, 24).map((isSelected, index) => (
        <g key={`left-${index}`} onClick={() => toggleSlot(index + 16)}>
          <rect
            y={index * 65 + 140}
            x="10"
            width="110"
            height="55"
            fill={isSelected ? "#939391" : "#e7e7e7"}
            style={{ cursor: "pointer" }}
          />
          <text
            x="65"
            y={index * 65 + 170}
            fontSize="18"
            fill="#666"
            textAnchor="middle"
          >
            {index + 16 + 1}
          </text>
        </g>
      ))}

      {/* Bottom Parking Slots */}
      {selectedSlots.slice(24, 40).map((isSelected, index) => (
        <g key={`bottom-${index}`} onClick={() => toggleSlot(index + 24)}>
          <rect
            x={index * 65 + 160}
            y="680"
            width="55"
            height="110"
            fill={isSelected ? "#939391" : "#e7e7e7"}
            style={{ cursor: "pointer" }}
          />
          <text
            x={index * 65 + 185}
            y="735"
            fontSize="18"
            fill="#666"
            textAnchor="middle"
          >
            {index + 24 + 1}
          </text>
        </g>
      ))}
      {/* Top-Center Parking Slots */}
      {selectedSlots.slice(40, 54).map((isSelected, index) => (
        <g key={`top-center-${index}`} onClick={() => toggleSlot(index + 40)}>
          <rect
            x={index * 65 + 290}
            y="285"
            width="55"
            height="110"
            fill={isSelected ? "#939391" : "#e7e7e7"}
            style={{ cursor: "pointer" }}
          />
          <text
            x={index * 65 + 315}
            y="340"
            fontSize="18"
            fill="#666"
            textAnchor="middle"
          >
            {index + 40 + 1}
          </text>
        </g>
      ))}
      {/* Top-Bottom Parking Slots */}
      {selectedSlots.slice(54, 68).map((isSelected, index) => (
        <g key={`top-bottom-${index}`} onClick={() => toggleSlot(index + 54)}>
          <rect
            x={index * 65 + 290}
            y="410"
            width="55"
            height="110"
            fill={isSelected ? "#939391" : "#e7e7e7"}
            style={{ cursor: "pointer" }}
          />
          <text
            x={index * 65 + 315}
            y="465"
            fontSize="18"
            fill="#666"
            textAnchor="middle"
          >
            {index + 54 + 1}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default ParkingSlots;
