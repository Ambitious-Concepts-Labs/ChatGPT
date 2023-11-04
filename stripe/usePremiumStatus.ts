import { useState, useEffect } from "react";
import isUserPremium from "./isUserPremium";

export default function usePremiumStatus(user: any) {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        const status = await isUserPremium();
        setPremiumStatus(status || false);
      };
      checkPremiumStatus();
    }
  }, [user]);

  return premiumStatus;
}