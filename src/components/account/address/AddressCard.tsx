interface Props {
  address: {
    parent_id: string;
    name: string;
    first_name: string;
    last_name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string | null;
    company: string | null;
    fingerprint: string;
    date_created: string;
    active: boolean;
    id: string;
  };
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
        <p>
          {address.state} {address.country}
        </p>
      </div>
      <div className="flex flex-col justify-between">
        <p className="label-xs-bold rounded bg-primary-light p-2 bg-gray-200">Default</p>
        <button className="px-2">Edit</button>
      </div>
    </div>
  );
};

export default AddressCard;
