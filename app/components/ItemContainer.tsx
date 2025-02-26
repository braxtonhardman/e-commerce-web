"use client";

import { useState } from "react";
import Item from "./Item";

function ItemContainer() {  

  return (
    <div className="grid grid-cols-4 gap-3">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
    </div>
  )
}

export default ItemContainer
