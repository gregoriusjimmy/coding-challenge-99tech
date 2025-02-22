import React, { useMemo, forwardRef } from "react";
import { BoxProps } from "@mui/material/Box";
import classes from "./WalletPage.module.css";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: EBlockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {
  children: React.ReactNode;
}

enum EBlockchain {
  OSMOSIS = "OSMOSIS",
  ETHEREUM = "ETHEREUM",
  ARBITRUM = "ARBITRUM",
  ZILLIQA = "ZILLIQA",
  NEO = "NEO",
}

const MAP_BLOCKCHAIN_PRIORITY = {
  [EBlockchain.OSMOSIS]: 100,
  [EBlockchain.ETHEREUM]: 50,
  [EBlockchain.ARBITRUM]: 30,
  [EBlockchain.ZILLIQA]: 20,
  [EBlockchain.NEO]: 20,
};

const LOWEST_PRIORITY = -99;

const getBlockchainPriority = (blockchain: EBlockchain): number => {
  return MAP_BLOCKCHAIN_PRIORITY[blockchain] || LOWEST_PRIORITY;
};

const WalletPage = forwardRef<HTMLDivElement, Props>(
  ({ children, ...rest }, ref) => {
    const balances = useWalletBalances();
    const prices = usePrices();

    const sortedBalances = useMemo(() => {
      const filteredAndFormatted = balances.reduce<FormattedWalletBalance[]>(
        (acc, balance) => {
          const priority = getBlockchainPriority(balance.blockchain);

          if (priority > LOWEST_PRIORITY && balance.amount <= 0) {
            acc.push({
              ...balance,
              formatted: balance.amount.toFixed(),
            });
          }

          return acc;
        },
        []
      );

      return filteredAndFormatted.sort(
        (lhs, rhs) =>
          getBlockchainPriority(rhs.blockchain) -
          getBlockchainPriority(lhs.blockchain)
      );
    }, [balances]);

    return (
      <div ref={ref} {...rest}>
        {sortedBalances.map(
          (balance: FormattedWalletBalance, index: number) => (
            <WalletRow
              className={classes.row}
              key={index}
              amount={balance.amount}
              usdValue={prices[balance.currency] ?? 0 * balance.amount ?? 0}
              formattedAmount={balance.formatted}
            />
          )
        )}
      </div>
    );
  }
);
