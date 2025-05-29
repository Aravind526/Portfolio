import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import '../App.css';

const SkillBar = ({ skill, percentage }: { skill: string; percentage: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      setWidth(percentage);
    }
  }, [inView, percentage]);

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-1">
        <span className="text-gray-700">{skill}</span>
        <span className="text-gray-500">{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
