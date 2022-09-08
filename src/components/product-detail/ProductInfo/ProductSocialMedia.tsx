import React from 'react';
import { AiFillFacebook, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai';
import { BsPinterest } from 'react-icons/bs';

const ProductSocialMedia = () => {
  return (
    <div className="flex space-x-3 text-3xl ">
      <AiFillFacebook className="text-secondary hover:text-primary cursor-pointer" />
      <BsPinterest className="text-secondary hover:text-primary cursor-pointer" />
      <AiOutlineTwitter className="text-secondary hover:text-primary cursor-pointer" />
      <AiFillLinkedin className="text-secondary hover:text-primary cursor-pointer" />
    </div>
  );
};

export default ProductSocialMedia;
