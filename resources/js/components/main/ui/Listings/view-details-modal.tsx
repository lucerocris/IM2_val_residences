import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Home } from "lucide-react"

interface Listing {
  id: number
  address: string
  unit_number: string
  availability_status: string
  floor_area: number
  rent_price: number
  property_type: string
  description: string
  amenities: string[]
  unit_photos: string[]
}

interface ViewDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  listing: Listing | null
}

export function ViewDetailsModal({ open, onOpenChange, listing }: ViewDetailsModalProps) {
  if (!listing) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatArea = (area: number) => {
    return `${area.toLocaleString()} sq ft`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Property Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Property Images */}
          <div className="grid grid-cols-2 gap-2">
            {listing.unit_photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Property ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg"
              />
            ))}
          </div>

          {/* Basic Info */}
          <div>
            <h3 className="text-xl font-semibold">{listing.address}</h3>
            <p className="text-gray-600">Unit {listing.unit_number}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span>{formatArea(listing.floor_area)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="capitalize">{listing.availability_status}</span>
              </div>
              <Badge variant="secondary">{listing.property_type}</Badge>
            </div>
          </div>

          <Separator />

          {/* Price */}
          <div>
            <h4 className="font-semibold mb-2">Rent</h4>
            <p className="text-2xl font-bold text-green-600">{formatPrice(listing.rent_price)} / month</p>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-gray-700">{listing.description}</p>
          </div>

          <Separator />

          {/* Amenities */}
          <div>
            <h4 className="font-semibold mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {listing.amenities.map((amenity) => (
                <Badge key={amenity} variant="outline">
                  {amenity.replace("_", " ")}
                </Badge>
              ))}
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
