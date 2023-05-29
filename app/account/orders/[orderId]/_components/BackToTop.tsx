'use client';

export default function BackToTop() {
  return (
    <div className="text-center">
      <button
        className="text-sm cursor-pointer"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }
      >
        Back to top
      </button>
    </div>
  );
}
