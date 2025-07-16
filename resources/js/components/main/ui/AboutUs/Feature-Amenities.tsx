import { Card, CardContent } from "@/components/ui/card";

interface FeatureAmenitiesProps {
    amenities: string[];
}

const FeatureAmenities = ({amenities}:FeatureAmenitiesProps) => {
    return(
        <>
            <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
                <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Features & Amenities</h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Experience resort-style living with world-class amenities designed for your comfort and enjoyment.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
                    <CardContent className="p-8">
                        <div className="grid md:grid-cols-2 gap-4">
                        {amenities.map((amenity, index) => (
                            <div
                            key={index}
                            className="flex items-center gap-3 p-4 bg-white/60 rounded-lg hover:bg-white/80 transition-colors"
                            >
                            <div className="w-3 h-3 bg-emerald-500 rounded-full flex-shrink-0"></div>
                            <span className="text-slate-700 font-medium">{amenity}</span>
                            </div>
                        ))}
                        </div>
                    </CardContent>
                    </Card>
                </div>
                </div>
            </section>
        </>
    );
}

export default FeatureAmenities;