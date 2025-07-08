import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell } from "lucide-react";

interface ListingsFilterProps {
    propertyTypeFilter: string;
    setPropertyTypeFilter: (value: string) => void;
    maxRentFilter: string;
    setMaxRentFilter: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    onSubscriptionClick: () => void;
    resultCount: number;
}

const ListingsFilter = ({ propertyTypeFilter, setPropertyTypeFilter, maxRentFilter, setMaxRentFilter, sortBy, setSortBy, onSubscriptionClick, resultCount }:ListingsFilterProps) => {
  return(
    <>
        <div className = "max-w-7xl mx-auto py-6">
            <div className = "flex flex-col space-y-4">

                <div className = "flex items-center justify-between">
                    <h1 className = "text-3xl font-bold text-gray-900">Available Units</h1>

                    <div className = "flex items-center gap-3">
                        <Badge
                          variant = "secondary"
                          className = "text-sm">
                            {resultCount} properties found
                        </Badge>
                    </div>
                </div>

                <div className = "flex flex-col sm:flex-row gap-2 justify-end">
                    {/* Property type filter */}
                    <Select
                      value = {propertyTypeFilter}
                      onValueChange={setPropertyTypeFilter}>
                        <SelectTrigger className = "w-full sm:w-[140px]">
                            <SelectValue placeholder = "Property Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value = "all">All Types</SelectItem>
                            <SelectItem value = "duplex">Duplex</SelectItem>
                            <SelectItem value = "triplex">Triplex</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Rent filter */}
                    <Select
                      value = {maxRentFilter}
                      onValueChange = {setMaxRentFilter}>
                        <SelectTrigger className = "w-full sm:w-[140px]">
                            <SelectValue placeholder = "Max Rent" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value = "all">Any Price</SelectItem>
                            <SelectItem value = "1000">Under $1,000</SelectItem>
                            <SelectItem value = "1500">Under $1,500</SelectItem>
                            <SelectItem value = "2000">Under $2,000</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Sorting */}
                    <Select
                      value = {sortBy}
                      onValueChange = {setSortBy}>
                        <SelectTrigger className = "w-full sm:w-[140px]">
                            <SelectValue placeholder = "Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value = "price_low">Price: Low to High</SelectItem>
                            <SelectItem value = "price_high">Price: High to Low</SelectItem>
                            <SelectItem value = "area_large">Area: Large to Small</SelectItem>
                            <SelectItem value = "area_small">Area: Small to Large</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    </>
  );
}

export default ListingsFilter;