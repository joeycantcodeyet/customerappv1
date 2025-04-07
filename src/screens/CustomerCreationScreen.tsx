
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const CustomerCreationScreen = () => {
  const initialFormData: CustomerFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  };

  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateFirstStep = () => {
    const { firstName, lastName, dateOfBirth } = formData;
    
    if (!firstName.trim() || !lastName.trim() || !dateOfBirth) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }
    
    // Validate date of birth format and age
    try {
      const dobDate = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      
      if (age < 21) {
        toast({
          title: "Age Restriction",
          description: "Customer must be 21 years or older",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Invalid Date",
        description: "Please enter a valid date of birth",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (validateFirstStep()) {
      setStep(2);
    }
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation for required fields
    if (!formData.address.trim() || !formData.city.trim() || !formData.state.trim() || !formData.zipCode.trim()) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to create customer
    setTimeout(() => {
      const newCustomerId = "cust_" + Math.random().toString(36).substring(2, 10);
      
      toast({
        title: "Success",
        description: "Customer created successfully",
      });
      
      // Navigate to the customer profile
      navigate(`/customer-profile/${newCustomerId}`);
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background p-4">
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/customer-search')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Create New Customer</h1>
      </div>
      
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-lg">
            {step === 1 ? "Step 1: Basic Information" : "Step 2: Address Information"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={step === 1 ? undefined : handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth <span className="text-red-500">*</span></Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address <span className="text-red-500">*</span></Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code <span className="text-red-500">*</span></Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex gap-2 justify-between">
          {step === 2 ? (
            <>
              <Button 
                variant="outline" 
                onClick={handlePreviousStep}
              >
                Back
              </Button>
              <Button 
                className="bg-[#295c07] hover:bg-[#265b07]" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Customer"}
              </Button>
            </>
          ) : (
            <Button 
              className="w-full bg-[#295c07] hover:bg-[#265b07]" 
              onClick={handleNextStep}
            >
              Next Step
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerCreationScreen;
