export function getCountString(count) {
    if (count < 1000) {
      return count + "";
    } else if (count < 1_000_000) {
      const computedCount = (count / 1000).toFixed(1);
      return (computedCount + "k").replace(".", ",");
    } else {
      const computedCount = (count / 1_000_000).toFixed(1);
      return (computedCount + "M").replace(".", ",");
    }
  };