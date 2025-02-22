import InputField from "components/InputField";
import { SelectSearch } from "components/SelectSearch";
import Spinner from "components/Spinner";
import { useCurrencySwapperForm } from "hooks";
import cn from "lib/cn";
import { useMemo, useState } from "react";
import useSWR from "swr";

export type TCoin = {
  currency: string;
  date: string;
  price: number;
};

function App() {
  const { data, error, isLoading } = useSWR<TCoin[]>(
    `https://interview.switcheo.com/prices.json`,
    (url: string) => {
      const response = fetch(url)
        .then((response) => response.json())
        .then((data) => data);
      return response;
    },
  );

  const filteredData = useMemo(() => {
    if (!data) return [];

    return Array.from(
      new Map(data.map((item) => [item.currency, item])).values(),
    );
  }, [data]);

  const {
    currFromOptions,
    currToOptions,
    fromAmount,
    fromCurrency,
    searchFromCurr,
    searchToCurr,
    toAmount,
    toCurrency,
    onDeleteFromCurr,
    onFromAmountChange,
    onSearchFromCurr,
    onSearchToCurr,
    onDeleteToCurr,
    onSelectToCurr,
    onSelectFromCurr,
    onSwap,
    onToAmountChange,
  } = useCurrencySwapperForm({ currencies: filteredData });

  const labeledCurrFromOptions = useMemo(
    () => getLabeledOptions(currFromOptions),
    [currFromOptions],
  );

  const labeledCurrToOptions = useMemo(
    () => getLabeledOptions(currToOptions),
    [currToOptions],
  );

  return (
    <div className="min-h-screen items-center  bg-slate-800 p-6 flex flex-col">
      <h1 className="text-3xl lg:text-5xl font-bold mt-[20vh] text-center mb-16 text-grey7-50">
        Currency Swapper
      </h1>
      {isLoading ? (
        <Spinner className="mt-8" />
      ) : error ? (
        <div>Error</div>
      ) : (
        <div className=" border-animation w-full  rounded-xl p-2  lg:w-[90%]  max-w-xl">
          <div className="space-y-8  bg-white p-6 rounded-xl">
            <div className="flex flex-col lg:flex-row justify-between items-center space-x-0 lg:space-x-4 w-full">
              <SelectSearch
                className="w-full lg:w-[40%] mb-4 lg:mb-0"
                placeholder="Choose currency"
                selected={fromCurrency}
                keyword={searchFromCurr}
                onSearch={onSearchFromCurr}
                onSelect={(opt) => onSelectFromCurr(opt.value)}
                onDelete={onDeleteFromCurr}
                options={labeledCurrFromOptions}
              />
              <InputField
                containerClassName="w-full lg:w-[60%]"
                className="w-full disabled:bg-slate-400 "
                disabled={!fromCurrency}
                value={fromAmount}
                onChange={(e) => onFromAmountChange(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <button
                className="bg-blue-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-600 transition"
                onClick={onSwap}
              >
                🔄 Swap
              </button>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center space-x-0 lg:space-x-4 w-full">
              <SelectSearch
                className="w-full lg:w-[40%] mb-4 lg:mb-0"
                placeholder="Choose currency"
                selected={toCurrency}
                keyword={searchToCurr}
                onSearch={onSearchToCurr}
                onSelect={(opt) => onSelectToCurr(opt.value)}
                onDelete={onDeleteToCurr}
                options={labeledCurrToOptions}
              />
              <InputField
                containerClassName="w-full lg:w-[60%]"
                className="w-full disabled:bg-slate-400 "
                disabled={!toCurrency}
                value={toAmount}
                onChange={(e) => onToAmountChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

const CoinIcon = ({ curr }: { curr: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <img
      className={cn("w-6 h-6", !isLoaded && "hidden")}
      onLoad={handleLoad}
      src={`https://github.com/Switcheo/token-icons/blob/main/tokens/${curr}.svg`}
    />
  );
};

const getLabeledOptions = (options: { currency: string }[]) =>
  options.map((c) => ({
    label: (
      <div className="flex items-center space-x-2">
        <span>{c.currency}</span>
        <CoinIcon curr={c.currency} />
      </div>
    ),
    value: c.currency,
  }));
