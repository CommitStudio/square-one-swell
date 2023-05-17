import Container from '~/layouts/Container';

type Props = {
  twoCols?: boolean;
};

const SkeletonPlaceholder = ({ twoCols = true }: Props) => {
  return (
    <Container className="mb-10">
      <div className="grid gap-10 lg:gap-0 lg:grid-cols-12 pt-10">
        {twoCols && (
          <div className="lg:col-span-3 lg:border-r mr-10">
            <div role="status" className="max-w-[150px] animate-pulse duration-500">
              <div className="h-4 bg-gray-medium rounded-full dark:bg-gray-dark w-42 mb-4"></div>
              <div className="h-3 bg-gray-medium rounded-full dark:bg-gray-dark w-32 mb-4"></div>
              <div className="h-3 bg-gray-medium rounded-full dark:bg-gray-dark w-24 mb-8"></div>
              <div className="h-2.5 bg-gray-medium rounded-full dark:bg-gray-dark w-40 max-w-[360px] mb-7"></div>
              <div className="h-2.5 bg-gray-medium rounded-full dark:bg-gray-dark w-32 mb-7"></div>
              <div className="h-2.5 bg-gray-medium rounded-full dark:bg-gray-dark w-32 mb-14"></div>
              <div className="h-2 bg-gray-medium rounded-full dark:bg-gray-dark max-w-[95px] mb-2.5"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <div className="lg:col-span-9">
          <div className="lg:col-span-3  mr-10">
            <div role="status" className="max-w-lg animate-pulse">
              <div className="h-7 bg-gray-medium rounded-full dark:bg-gray-dark w-56 mb-9"></div>
              <div className="h-2 bg-gray-medium rounded-full dark:bg-gray-dark max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-medium rounded-full dark:bg-gray-dark mb-2.5"></div>
              <div className="h-2 bg-gray-medium rounded-full dark:bg-gray-dark max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-medium rounded-full dark:bg-gray-dark max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-medium rounded-full dark:bg-gray-dark max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-medium rounded-full dark:bg-gray-dark max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-medium rounded-full dark:bg-gray-dark max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-medium rounded-full dark:bg-gray-dark max-w-[360px] mb-2.5"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SkeletonPlaceholder;
