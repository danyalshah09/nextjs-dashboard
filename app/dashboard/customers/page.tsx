import CustomersTable from "@/app/ui/customers/table";
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchFilteredCustomers, fetchCustomersPages } from '@/app/lib/data';
import Pagination from '@/app/ui/invoices/pagination';

interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const customers = await fetchFilteredCustomers(query,currentPage);
    const totalPages = await fetchCustomersPages(query);
    return (
   <>
      <Search placeholder="Search customers..." />
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable customers={customers}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {totalPages > 1 && <Pagination totalPages={totalPages} />}
      </div>
  </>)}