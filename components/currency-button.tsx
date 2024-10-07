"use client";

import { useEffect, useState } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { currency, useCurrencyStore } from "@/hooks/use-store";

export default function CurrencyButton() {
  const [flag, setFlag] = useState("in");
  const { setCurrency, currency } = useCurrencyStore();

  // Define a handler to update flag based on currency value
  const handleFlagChange = (value: currency) => {
    setCurrency(value);

    // Update flag based on the selected currency
    switch (value) {
      case "usd":
        setFlag("us");
        break;
      case "eur":
        setFlag("eu");
        break;
      case "inr":
        setFlag("in");
        break;
      case "gbp":
        setFlag("gb-eng");
        break;
      case "aed":
        setFlag("ae");
        break;
      case "sgd":
        setFlag("sg");
        break;
      case "aud":
        setFlag("au");
        break;
      case "cad":
        setFlag("ca");
        break;
      default:
        setFlag("in");
    }
  };

  useEffect(() => {
    if (currency !== "inr") handleFlagChange(currency);
  }, []);

  return (
    <Select onValueChange={handleFlagChange} defaultValue={currency}>
      <SelectTrigger>
        <span className={`fi fi-${flag}`}></span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="usd">
          <span className="fi fi-us"></span> USD
        </SelectItem>
        <SelectItem value="eur">
          <span className="fi fi-eu"></span> EUR
        </SelectItem>
        <SelectItem value="inr">
          <span className="fi fi-in"></span> INR
        </SelectItem>
        <SelectItem value="gbp">
          <span className="fi fi-gb-eng"></span> GBP
        </SelectItem>
        <SelectItem value="aed">
          <span className="fi fi-ae"></span> AED
        </SelectItem>
        <SelectItem value="sgd">
          <span className="fi fi-sg"></span> SGD
        </SelectItem>
        <SelectItem value="aud">
          <span className="fi fi-au"></span> AUD
        </SelectItem>
        <SelectItem value="cad">
          <span className="fi fi-ca"></span> CAD
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
