const Copyright = () => {
  return (
    <div className="h-16 bg-gray flex justify-center items-center text-black">
      <p className="text-gray-500 text-sm">
        Square One - &copy; {new Date().getFullYear()} - All Rights Reserved
      </p>
    </div>
  );
};

export default Copyright;
