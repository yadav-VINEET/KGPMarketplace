import SubmitButton from "@/components/SubmitButton";
import {faStore} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import LabelRadioButton from "./LabelRadioButton";
import { categories } from "@/libs/helpers";

type Props = {
  action: (data:FormData) => void;
};

export default function SearchForm({action}: Props){
  const formRef = useRef<HTMLFormElement|null>(null);
  return (
    <form
      ref={formRef}
      action={action}
      className="bg-white grow px-10 py-2 w-auto sm:w-1/4 sm:p-4 border-r flex flex-col gap-4 sm:sticky top-0">
      <input name="phrase" type="text" placeholder="Search"/>
      <div className="flex flex-col gap-0">
        <LabelRadioButton
          name={'category'}
          value={''}
          icon={faStore}
          onClick={() => formRef.current?.requestSubmit()}
          label={'All'}
          defaultChecked={true}
        />
        {categories.map(({key: categoryKey, label, icon}) => (
          <LabelRadioButton
            key={categoryKey}
            name={'category'}
            value={categoryKey}
            icon={icon}
            onClick={() => formRef.current?.requestSubmit()}
            label={label}
          />
        ))}
      </div>
      <div className="">
        <label>Filter by price</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input name="min" type="number" placeholder="min"/>
          </div>
          <div>
            <input name="max" type="number" placeholder="max"/>
          </div>
        </div>
      </div>
      <SubmitButton>Search</SubmitButton>
    </form>
  );
}