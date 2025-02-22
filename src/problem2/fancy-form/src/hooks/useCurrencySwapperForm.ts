import { TCoin } from "App";
import { useCallback, useMemo, useState } from "react";

interface UseCurrencySwapperForm {
  currencies: TCoin[];
}
export const useCurrencySwapperForm = ({
  currencies,
}: UseCurrencySwapperForm) => {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [searchFromCurr, setSearchFromCurr] = useState("");
  const [searchToCurr, setSearchToCurr] = useState("");

  const getPrice = useCallback(
    (currency: string) =>
      currencies?.find((c) => c.currency === currency)?.price || 1,
    [currencies],
  );

  const fromPrice = useMemo(
    () => getPrice(fromCurrency),
    [fromCurrency, getPrice],
  );
  const toPrice = useMemo(() => getPrice(toCurrency), [getPrice, toCurrency]);

  const handleSelectFromCurr = (cur: string) => {
    setFromCurrency(cur);
    const newFromPrice = getPrice(cur);
    setFromAmount(
      convertAmount({
        value: toAmount,
        fromPrice: toPrice,
        toPrice: newFromPrice,
      }),
    );
  };

  const handleSelectToCurr = (cur: string) => {
    setToCurrency(cur);
    const newToPrice = getPrice(cur);
    setToAmount(
      convertAmount({ value: fromAmount, fromPrice, toPrice: newToPrice }),
    );
  };

  const handleDeleteFromCurr = () => {
    setFromCurrency("");
    setFromAmount("");
    setSearchFromCurr("");
  };

  const handleDeleteToCurr = () => {
    setToCurrency("");
    setToAmount("");
    setSearchToCurr("");
  };

  const handleSearchFromCurr = (value: string) => {
    const alphabetOnly = value.replace(/[^a-zA-Z]/g, ''); 
    setSearchFromCurr(alphabetOnly);
  };

  const handleSearchToCurr = (value: string) => {
    const alphabetOnly = value.replace(/[^a-zA-Z]/g, ''); 
    setSearchToCurr(alphabetOnly);
  };
  const handleFromAmountChange = useCallback(
    (value: string) => {
      if (!/^\d*\.?\d*$/.test(value)) return "";
      setFromAmount(value);
      if (!fromCurrency || !toCurrency) return;
      setToAmount(convertAmount({ value, fromPrice, toPrice }));
    },
    [fromCurrency, fromPrice, toCurrency, toPrice],
  );

  const handleToAmountChange = useCallback(
    (value: string) => {
      if (!/^\d*\.?\d*$/.test(value)) return "";
      setToAmount(value);
      if (!fromCurrency || !toCurrency) return;
      setFromAmount(
        convertAmount({ value, fromPrice: toPrice, toPrice: fromPrice }),
      );
    },
    [fromCurrency, fromPrice, toCurrency, toPrice],
  );

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const currFromOptions = useMemo(() => {
    return currencies.filter((c) =>
      c.currency.toLowerCase().includes(searchFromCurr.toLowerCase()),
    );
  }, [currencies, searchFromCurr]);

  const currToOptions = useMemo(() => {
    return currencies.filter((c) =>
      c.currency.toLowerCase().includes(searchToCurr.toLowerCase()),
    );
  }, [currencies, searchToCurr]);

  return {
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    searchFromCurr,
    searchToCurr,
    fromPrice,
    toPrice,
    currFromOptions,
    currToOptions,
    onSwap: handleSwap,
    onFromAmountChange: handleFromAmountChange,
    onSearchToCurr: handleSearchToCurr,
    onSearchFromCurr: handleSearchFromCurr,
    onSelectFromCurr: handleSelectFromCurr,
    onDeleteFromCurr: handleDeleteFromCurr,
    onToAmountChange: handleToAmountChange,
    onSelectToCurr: handleSelectToCurr,
    onDeleteToCurr: handleDeleteToCurr,
  };
};

const convertAmount = ({
  value,
  fromPrice,
  toPrice,
}: {
  value: string;
  fromPrice: number;
  toPrice: number;
}) => {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue) || !fromPrice || !toPrice) return "";

  const amountInUSD = numericValue * fromPrice;
  return (amountInUSD / toPrice).toString();
};
