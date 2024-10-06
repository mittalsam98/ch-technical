import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { API_URL, DATE_RANGE_FILTER } from '@/lib/constants';
import { GoldPriceData } from '@/lib/types';
import { CategoryScale } from 'chart.js';
import { Chart, LinearScale } from 'chart.js/auto';
import {
  compareAsc,
  compareDesc,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths
} from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import MaxReturnModal from './maxReturnModal';
import { DatePickerComp } from './reactDatePicker';

Chart.register(LinearScale);
Chart.register(CategoryScale);

const GoldPriceChart: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [error, setError] = useState('');
  const [goldPrices, setGoldPrices] = useState<GoldPriceData[]>([]);

  useEffect(() => {
    console.log(startDate, '-------', endDate);
    if (startDate && endDate) {
      console.log(compareAsc(new Date(startDate), new Date(endDate)));
      if (compareDesc(new Date(startDate), new Date(endDate)) === -1) {
        setError(`Start date can't be greater/equal than end date`);
        return;
      }
      const formattedStart = format(startDate, 'yyyy-MM-dd');
      const formattedEnd = format(endDate, 'yyyy-MM-dd');
      setError('');
      fetchGoldPrices(formattedStart, formattedEnd);
    }
  }, [startDate, endDate]);

  const fetchGoldPrices = async (startDate: string, endDate: string) => {
    try {
      const response = await fetch(`${API_URL}/${startDate}/${endDate}/?format=json`);
      const data = await response.json();

      const prices = data.map((item: any) => ({
        date: item.data,
        price: item.cena
      }));
      setGoldPrices(prices);
    } catch (e) {
      setError(JSON.stringify(e));
    }
  };

  // console.log(formatDistanceToNow(new Date(2014, 6, 2)));
  // console.log(subMonths(new Date(), 1));

  const chartData = {
    labels: goldPrices.map((price) => price.date),
    datasets: [
      {
        label: 'Gold Price',
        data: goldPrices.map((price) => price.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: true
      }
    ]
  };

  const handleDropdownChnge = (e: string) => {
    const today = new Date();

    if (e === 'this-week') {
      const startOfThisWeek = startOfWeek(today);
      setStartDate(startOfThisWeek);
      setEndDate(today);
    } else if (e === 'last-week') {
      // console.log(startOfWeek(new Date()));
      const startOfLastWeek = startOfWeek(subDays(today, 7));
      const endOfLastWeek = subDays(startOfWeek(today), 1);
      setStartDate(startOfLastWeek);
      setEndDate(endOfLastWeek);
    } else if (e === 'this-month') {
      const startOfThisMonth = startOfMonth(today);
      setStartDate(startOfThisMonth);
      setEndDate(today);
    } else if (e === 'last-month') {
      const startOfLastMonth = startOfMonth(subMonths(today, 1));
      const endOfLastMonth = subDays(startOfMonth(today), 1);
      setStartDate(startOfLastMonth);
      setEndDate(endOfLastMonth);
    } else if (e === 'this-year') {
      // console.log(startOfYear(new Date()));

      const startOfThisYear = startOfYear(today);
      setStartDate(startOfThisYear);
      setEndDate(today);
    } else {
      setStartDate(undefined);
      setEndDate(undefined);
      setGoldPrices([]);
    }
  };

  return (
    <div className='container mx-auto p-4 mt-24'>
      <h1 className='text-2xl font-bold text-center mb-6'>Gold Price Fluctuations</h1>
      <div className='flex justify-center space-x-4 my-4 flex-col items-center gap-4 md:flex-row'>
        <DatePickerComp
          disabled={(date) => date > new Date()}
          placeholder='Pick Start Sate'
          date={startDate}
          setDate={setStartDate}
        />
        <DatePickerComp
          disabled={(date) => date > new Date()}
          placeholder='Pick End Sate'
          date={endDate}
          setDate={setEndDate}
        />
        <Select onValueChange={handleDropdownChnge}>
          <SelectTrigger className='w-[280px]'>
            <SelectValue placeholder='Select date range' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select date range</SelectLabel>
              {DATE_RANGE_FILTER.map((datum) => {
                return <SelectItem value={datum?.value}>{datum.label}</SelectItem>;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <MaxReturnModal goldPrices={goldPrices} />
      </div>
      {error && <div className='mb-8 flex items-center justify-center text-red-400'>{error}</div>}
      <Line datasetIdKey='id' data={chartData} />{' '}
    </div>
  );
};

export default GoldPriceChart;
