type Props = {
  additional_information: {
    Weight?: string;
    Dimensions?: string;
    Materials?: string;
    Size?: string;
  };
};

const AdditionalInfo = ({ additional_information }: Props) => {
  return (
    <div className="max-w-[500px] mx-auto my-10 space-y-5 p-5">
      {Object.entries(additional_information).map(([key, value]) => {
        return (
          <div className="flex justify-between" key={value}>
            <span>{key}</span>
            <span>{value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AdditionalInfo;
