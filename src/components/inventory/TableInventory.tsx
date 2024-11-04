import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table";
import { apiService } from "../../services/apiServices"; 
import { Material, Tipo } from "../interface/interface";
import { useEffect, useState } from "react";

export const TableInventory = () => {
  
    useEffect(() => {
        apiService.get('inventario')
        .then((data:Material[]) => {
            console.log(data)
        })
    }, [])
  
    return (
    <Table className="" >
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
        </TableBody>
    </Table>
  )
}

export default TableInventory;