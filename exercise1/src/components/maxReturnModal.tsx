import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { GoldPriceData } from '@/lib/types';

export default function MaxReturnModal({ goldPrices }: { goldPrices: GoldPriceData[] }) {
  const [investment, setInvestment] = useState<number | null>(null);
  const [buyDate, setBuyDate] = useState<string | undefined>(undefined);
  const [sellDate, setSellDate] = useState<string | undefined>(undefined);
  const [maxReturns, setMaxReturns] = useState<number | undefined>(undefined);

  useEffect(() => {
    setBuyDate(undefined);
    setSellDate(undefined);
    setMaxReturns(undefined);
  }, [goldPrices]);

  const calculateReturns = () => {
    if (!goldPrices.length || !investment) return;

    const minPrice = Math.min(...goldPrices.map((price) => price.price));
    const maxPrice = Math.max(...goldPrices.map((price) => price.price));

    const buyDate = goldPrices.find((price) => price.price === minPrice)?.date;
    const sellDate = goldPrices.find((price) => price.price === maxPrice)?.date;
    const maxReturns = (investment / minPrice) * maxPrice - investment;

    setBuyDate(buyDate);
    setSellDate(sellDate);
    setMaxReturns(maxReturns);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button className=''>Calculate MaxReturn</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Maximum returns on gold investment</DialogTitle>
          <DialogDescription>
            <Input
              type='number'
              value={investment || ''}
              onChange={(e) => setInvestment(parseFloat(e.target.value))}
              placeholder='Investment Amount (USD)'
              className='border my-4'
            />
            <Button onClick={calculateReturns} className='bg-green-700 text-white px-4 py-2'>
              Calculate Returns
            </Button>

            {maxReturns !== undefined && (
              <div className='mt-4 py-3 px-4 bg-white border border-gray-200 rounded-lg shadow '>
                <div className='text-lg font-bold'>Gold Investment Summary</div>
                <p>
                  <strong className='text-md'>Buy Date:</strong> {buyDate || 'N/A'}
                </p>
                <p>
                  <strong className='text-md'>Sell Date:</strong> {sellDate || 'N/A'}
                </p>
                <p>
                  <strong className='text-md'>Maximum Returns:</strong> $
                  {maxReturns.toFixed(2) || '0.00'}
                </p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
