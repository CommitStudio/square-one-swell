import { useRouter } from 'next/router';
import React from 'react';
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineTwitter,
  AiOutlineWhatsApp
} from 'react-icons/ai';
import { BsPinterest } from 'react-icons/bs';

const ProductSocialMedia = () => {
  const router = useRouter();
  const route = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;
  const formattedRoute = route.replaceAll(':', '%3A').replaceAll('/', '%2F');

  return (
    <div className="flex space-x-3 text-3xl ">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.facebook.com/sharer/sharer.php?u=${formattedRoute}`}
      >
        <AiFillFacebook className="text-secondary hover:text-primary cursor-pointer" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`http://pinterest.com/pin/create/button/?url=${formattedRoute}&media=&description=Check%20out%20this%20amazing%20product!`}
      >
        <BsPinterest className="text-secondary hover:text-primary cursor-pointer" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://twitter.com/intent/tweet?url=${formattedRoute}&text=Check%20out%20this%20amazing%20product!`}
      >
        <AiOutlineTwitter className="text-secondary hover:text-primary cursor-pointer" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://api.whatsapp.com/send?text=Check%20out%20this%20amazing%20product:%20${route}`}
      >
        <AiOutlineWhatsApp className="text-secondary hover:text-primary cursor-pointer" />
      </a>
    </div>
  );
};

export default ProductSocialMedia;
