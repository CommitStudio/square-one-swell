'use client';

import { useCountdown } from '~/_hooks/useCountdown';

type CountdownProps = {
  promotion: Promotion;
};

const Countdown = ({ promotion }: CountdownProps) => {
  const dateEnd = promotion.date_end || new Date();

  const dateTimeDealWillFinish = new Date(dateEnd).getTime(); // new Date('Year-Month-DayTHour:Minutes:Seconds').getTime();
  const [days, hours, minutes, seconds] = useCountdown(Number(dateTimeDealWillFinish));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-between mb-10 md:mb-0 text-black font-quicksand">
      <div>
        <div className="bg-gray text-black border border-black rounded-2xl font-libre mb-3 mx-auto h-20 w-20 flex justify-center items-center text-3xl">
          {Number(days) >= 0 ? days : '00'}
        </div>
        <p className="text-center">Days</p>
      </div>
      <div>
        <div className="bg-gray text-black border border-black rounded-2xl font-libre mb-3 mx-auto h-20 w-20 flex justify-center items-center text-3xl">
          {Number(hours) >= 0 ? hours : '00'}
        </div>
        <p className="text-center">Hours</p>
      </div>
      <div>
        <div className="bg-gray text-black border border-black rounded-2xl font-libre mb-3 mx-auto h-20 w-20 flex justify-center items-center text-3xl">
          {Number(minutes) >= 0 ? minutes : '00'}
        </div>
        <p className="text-center">Minutes</p>
      </div>
      <div>
        <div className="bg-gray text-black border border-black rounded-2xl font-libre mb-3 mx-auto h-20 w-20 flex justify-center items-center text-3xl">
          {Number(seconds) >= 0 ? seconds : '00'}
        </div>
        <p className="text-center">Seconds</p>
      </div>
    </div>
  );
};

export default Countdown;
