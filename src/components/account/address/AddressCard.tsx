interface Props {
  address: SwellAddressResult;
}

const AddressCard = ({ address }: Props) => {
  return (
    <div className="flex rounded bg-primary-lightest p-4 shadow-md border border-gray-50 justify-between mb-2">
      <div className="space-y-2">
        <p>
          {address.first_name} {address.last_name}
        </p>
        <p>{address.address1}</p>
        <p>
          {address.city} {address.zip}
        </p>
        <p>{address.country}</p>
      </div>
      <div className="flex flex-col justify-between">
        <button className="px-2">Edit</button>
      </div>
    </div>
  );
};

export default AddressCard;
