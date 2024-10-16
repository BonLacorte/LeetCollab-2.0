import { useGetUserSubmissionsQuery } from '@/app/(state)/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';

const ITEMS_PER_PAGE = 10

const CardSubmissions = () => {
    const { data: session } = useSession(); // Get the session data
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const { data: submissions, isLoading: submissionsLoading, error: submissionsError } = useGetUserSubmissionsQuery(session?.user.id!);

    console.log(submissions)

    if (submissionsError) {
        return <div>Error: {submissionsError.toString()}</div>;
    }

    const filteredSubmissions = submissions?.filter((submission: any) =>
        submission.problem.problemId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredSubmissions?.length! / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedSubmissions = filteredSubmissions?.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }

    return (
        <div className="container mx-auto">
        {submissionsLoading ? (
            <div><p>Loading...</p></div>
        ) : (
            <>
                <div className="rounded-lg ">
                    {/* <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-gray-900 mb-6">Problem Set</CardTitle>
                        <CardDescription>Search and filter coding challenges</CardDescription>
                    </CardHeader> */}
                    <div>
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            {/* <div className="relative flex-grow">
                                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search problems..."
                                    className="pl-8 border-gray-300 rounded-2xl"
                                    value={searchTerm}
                                    onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setCurrentPage(1)  // Reset to first page on search
                                    }}
                                />
                            </div> */}
                            {/* <Select onValueChange={(value) => setSelectedDifficulty(value === "all" ? null : value)}>
                                <SelectTrigger className="w-[180px] border-gray-300 rounded-2xl">
                                    <SelectValue className='dark:text-gray-900 text-gray-100' placeholder="Difficulty"/>
                                </SelectTrigger>
                                <SelectContent className='border-gray-300 rounded-2xl bg-white'>
                                    <SelectItem className='dark:text-gray-900 text-gray-100 hover:text-gray-100' value="all">All Difficulties</SelectItem>
                                    {difficulties.map((diff) => (
                                        <SelectItem className='dark:text-gray-900 text-gray-100 hover:text-gray-100' key={diff} value={diff}>{diff}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}>
                                <SelectTrigger className="w-[180px] border-gray-300 rounded-2xl">
                                    <SelectValue className='dark:text-gray-900 text-gray-100' placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent className='border-gray-300 rounded-2xl dark:bg-gray-100 bg-gray-900'>
                                    <SelectItem className='dark:text-gray-900 text-gray-100 hover:text-gray-100' value="all">All Categories</SelectItem>
                                    {categories.map((cat) => (
                                        <SelectItem className='dark:text-gray-900 text-gray-100 hover:text-gray-100' key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select> */}
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-gray-100">
                                    <TableHead className="w-[100px]">Time Submitted</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead className="w-[100px]">Status</TableHead>
                                    <TableHead className="w-[150px]">Language</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                {paginatedSubmissions?.map((submission: any) => {
                                    const problem = submission.problem;  // Access the nested problem object
                                    
                                    return(
                                        <TableRow 
                                        key={problem.problemId} 
                                        className="hover:bg-gray-200">
                                            <TableCell>
                                                {/* <div className="flex items-center">
                                                    <BsCheck2Circle className="text-green-500 mr-2" />
                                                    <span className="text-green-500">Solved</span>
                                                </div> */}
                                                {new Date(submission.createdAt).toLocaleString()}
                                            </TableCell>
                                            <TableCell className="font-medium">{problem.order}. {problem.title}</TableCell>
                                            <TableCell>
                                                <Badge 
                                                    className={`${submission.status === 'Accepted' ? 'bg-green-500' : submission.status === 'Wrong Answer' ? 'bg-red-500' : 'bg-yellow-500'} rounded-xl flex items-center justify-center`}
                                                >
                                                    {submission.status === 'Accepted' ? 'Accepted' : submission.status === 'Wrong Answer' ? 'Wrong' : 'TLE'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>Javascript</TableCell>
                                        </TableRow>
                                    )
                                })}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredSubmissions?.length!)} of {filteredSubmissions?.length} problems
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="bg-gray-100 border-gray-300 hover:border-gray-400 rounded-3xl"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="text-sm font-medium">
                                Page {currentPage} of {totalPages}
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="bg-gray-100 border-gray-300 hover:border-gray-400 rounded-3xl"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        )}
        </div>
    )
}

export default CardSubmissions