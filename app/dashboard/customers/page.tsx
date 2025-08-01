import Table from '@/app/ui/customers/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import {Suspense} from "react";
import { fetchCustomersPages, fetchFilteredCustomers } from '@/app/lib/data';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/invoices/pagination';
import CustomersTable from '@/app/ui/customers/table';

export default async function Page(
    {searchParams,}
  : {searchParams?: {
    query?: string;
    page?: string;
  };
  }
){
  const resolvedSearchParams = await searchParams || {};
  const query = resolvedSearchParams.query || '';
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const customers = await fetchFilteredCustomers(query, currentPage);
  const totalPages = await fetchCustomersPages(query);

    return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
         {totalPages > 1 && <Pagination totalPages={totalPages} />}
      </div>
    </div>
  );
}