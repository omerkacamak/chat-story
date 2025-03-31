// src/app/_components/FeatureGrid.tsx
type Feature = {
    title: string;
    description: string;
  };
  
  type FeatureGridProps = {
    features: Feature[];
  };
  
  const FeatureGrid = ({ features }: FeatureGridProps) => {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-12">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="flex flex-col items-center p-6 bg-white/5 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-center text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default FeatureGrid;