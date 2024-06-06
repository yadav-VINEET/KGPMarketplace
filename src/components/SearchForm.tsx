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
      className="bg-white grow w-1/4 p-4 border-r flex flex-col gap-4 sticky top-0">
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
        <div className="grid md:grid-cols-2 grid-rows gap-4">
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