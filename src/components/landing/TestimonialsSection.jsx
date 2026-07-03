import { Star, Quote } from "lucide-react";

const TestimonialsSection = ({ testimonials }) => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent relative">
      <div className="absolute top-[50%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-extrabold text-center text-white mb-16 tracking-tight">
          What our users say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 p-8 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] hover:border-cyan-500/30 hover:-translate-y-1"
            >
              {/* Star ratings */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 mb-8 leading-relaxed font-light">
                "{testimonial.quote}"
              </p>

              {/* User info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg mr-4 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-cyan-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;