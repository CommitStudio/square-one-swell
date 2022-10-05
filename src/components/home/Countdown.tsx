import { useCountdown } from '~/hooks/useCountdown';

type CountdownProps = {
  promotion: Promotion;
};

const Countdown = ({ promotion }: CountdownProps) => {
  const date_end = promotion.date_end || new Date(); // TODO: improve this

  const dateTimeDealWillFinish = new Date(date_end).getTime(); // new Date('Year-Month-DayTHour:Minutes:Seconds').getTime();
  const [days, hours, minutes, seconds] = useCountdown(Number(dateTimeDealWillFinish));

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-between mb-10 md:mb-0">
      <div>
        <div className="bg-secondary text-primary mb-3 mx-auto h-20 w-20 flex justify-center items-center text-3xl">
          {Number(days) >= 0 ? days : '00'}
        </div>
        <p className="text-center text-gray-600">Days</p>
      </div>
      <div>
        <div className="bg-secondary text-primary mb-3 mx-auto h-20 w-20 flex justify-center items-center text-center text-3xl">
          {Number(hours) >= 0 ? hours : '00'}
        </div>
        <p className="text-center text-gray-600">Hours</p>
      </div>
      <div>
        <div className="bg-secondary text-primary mb-3 mx-auto h-20 w-20 flex justify-center items-center text-center text-3xl">
          {Number(minutes) >= 0 ? minutes : '00'}
        </div>
        <p className="text-center text-gray-600">Minutes</p>
      </div>
      <div>
        <div className="bg-secondary text-primary mb-3 mx-auto h-20 w-20 flex justify-center items-center text-center text-3xl">
          {Number(seconds) >= 0 ? seconds : '00'}
        </div>
        <p className="text-center text-gray-600">Seconds</p>
      </div>
    </div>
  );
};

export default Countdown;
