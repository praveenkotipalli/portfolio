// app/components/ProjectTooltipCard.tsx
import React from 'react';

interface ProjectTooltipCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ProjectTooltipCard: React.FC<ProjectTooltipCardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    // This is the black card
    <div className=" p- rounded-lg  w-60 " style={{ backgroundColor: '#CFCFCF' }}>
      {/* YouTube thumbnail size (16:9) */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-auto aspect-video object-cover rounded mb-2"
      />
      <div className="my-2 flex flex-col">
        {/* Title of the project */}
        <p className="text-base font-bold text-black">{title}</p>
        {/* Description */}
        <p className="mt-1 text-sm text-gray-800">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectTooltipCard;