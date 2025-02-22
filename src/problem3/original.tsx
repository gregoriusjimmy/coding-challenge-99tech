
interface WalletBalance {
  currency: string;
  amount: number;  
}

// this type is similar to WalletBalance, but it has an additional field so we can extends this type from WalletBalance
// we also can combine this type to make formmated become optional
interface FormattedWalletBalance {
  currency: string; 
  amount: number;
  formatted: string;
}
// BoxProps is not defined in this file, so we need to import it from the correct file
// Props should not be empty, so we need to add the correct types to it
interface Props extends BoxProps {

}
// We need to import React
// It is better to destructure the props in the function signature
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Avoid any type
  // Use enum for the blockchain types, if it comes from API we can just define it as string
  // Use map instead of switch case
  // move the function outside the component
  // move lowest priority number to constant
	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      //missing blockchain type from WalletBalance
		  const balancePriority = getPriority(balance.blockchain);
      // lhsPriority is not defined, so we need to use balancePriority
      // this condition says we want to include the balance that has priority and has no amount 
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
      // should handle equal value
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
    //prices is not used in the useMemo, so we need to exclude it from the dependency array
  }, [balances, prices]);

  // we can combine this into 1 loop function with above
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  // we can just map this in the return statement to avoid extra memory
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
      //classes is not defined
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    // if we want to pass the rest props to the div, then it is better to set the type props for the div and forward the ref
    // just in case we needed it later
    <div {...rest}>
      {rows}
    </div>
  )
}