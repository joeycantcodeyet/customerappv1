
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';

interface CustomerFormData {
  customerType: string;
  firstName: string;
  nickname: string;
  lastName: string;
  dateOfBirth: Date | undefined;
  driversLicense: string;
  idExpirationDate: Date | undefined;
  gender: string;
  stateMedicalId: string;
  email: string;
  phone: string;
  address: string;
  secondaryAddress: string;
  customerGroups: string;
  warnings: string[];
  notes: string;
  customerSource: string;
  rewardEligible: string;
  alphaIqLoyalty: string;
  alphaIqLinked: string;
}

const CustomerCreationScreen = () => {
  const initialFormData: CustomerFormData = {
    customerType: '',
    firstName: '',
    nickname: '',
    lastName: '',
    dateOfBirth: undefined,
    driversLicense: '',
    idExpirationDate: undefined,
    gender: '',
    stateMedicalId: '',
    email: '',
    phone: '',
    address: '',
    secondaryAddress: '',
    customerGroups: '',
    warnings: [],
    notes: '',
    customerSource: '',
    rewardEligible: '',
    alphaIqLoyalty: '',
    alphaIqLinked: '',
  };

  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, date: Date | undefined) => {
    setFormData(prev => ({ ...prev, [name]: date }));
  };

  const handleCheckboxChange = (warning: string, checked: boolean) => {
    setFormData(prev => {
      if (checked) {
        return { ...prev, warnings: [...prev.warnings, warning] };
      } else {
        return { ...prev, warnings: prev.warnings.filter(w => w !== warning) };
      }
    });
  };

  const handleProfileImageUpload = () => {
    // In a real app, this would open a file picker
    setProfileImage('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
  };

  const handleCancel = () => {
    navigate('/customer-search');
  };

  const handleSubmit = () => {
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
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <button 
          onClick={handleCancel}
          className="text-green-600 font-medium"
        >
          Cancel
        </button>
        <h1 className="text-base font-medium">Create Customer</h1>
        <button 
          onClick={handleSubmit}
          className="text-green-600 font-medium"
          disabled={isSubmitting}
        >
          Create
        </button>
      </div>

      <div className="flex-1 overflow-auto pb-16">
        <div className="p-4 space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center space-y-2">
            <div className="h-20 w-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <div className="h-20 w-20 bg-gray-200 rounded-full" />
              )}
            </div>
            <button 
              onClick={handleProfileImageUpload}
              className="text-xs px-4 py-1 rounded-full bg-green-100 text-green-600"
            >
              Upload
            </button>
          </div>

          {/* Customer Information Section */}
          <div>
            <h2 className="text-xs uppercase text-green-600 font-medium mb-2">Customer Information</h2>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label htmlFor="customerType" className="text-sm">Customer Type<span className="text-red-500">*</span></Label>
                  <span className="text-sm text-gray-400">Select</span>
                </div>
                <Select 
                  onValueChange={(value) => handleSelectChange('customerType', value)}
                  value={formData.customerType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recreational">Recreational</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="caregiver">Caregiver</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="firstName" className="text-sm">First name<span className="text-red-500">*</span></Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="nickname" className="text-sm">Nickname</Label>
                <Input
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  placeholder="Nickname"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="lastName" className="text-sm">Last name<span className="text-red-500">*</span></Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="dateOfBirth" className="text-sm">Date of Birth<span className="text-red-500">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dateOfBirth && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfBirth ? format(formData.dateOfBirth, "MM/dd/yyyy") : <span>MM/DD/YYYY</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateOfBirth}
                      onSelect={(date) => handleDateChange('dateOfBirth', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-1">
                <Label htmlFor="driversLicense" className="text-sm">Drivers license<span className="text-red-500">*</span></Label>
                <Input
                  id="driversLicense"
                  name="driversLicense"
                  value={formData.driversLicense}
                  onChange={handleInputChange}
                  placeholder="Driver's license number"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="idExpirationDate" className="text-sm">ID Expiration Date<span className="text-red-500">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.idExpirationDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.idExpirationDate ? format(formData.idExpirationDate, "MM/dd/yyyy") : <span>MM/DD/YYYY</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.idExpirationDate}
                      onSelect={(date) => handleDateChange('idExpirationDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label className="text-sm">Gender<span className="text-red-500">*</span></Label>
                  <span className="text-sm">{formData.gender || 'Female'}</span>
                </div>
                <RadioGroup 
                  defaultValue="female" 
                  className="flex gap-4" 
                  onValueChange={(value) => handleSelectChange('gender', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-1">
                <Label htmlFor="stateMedicalId" className="text-sm">State Medical ID<span className="text-red-500">*</span></Label>
                <Input
                  id="stateMedicalId"
                  name="stateMedicalId"
                  value={formData.stateMedicalId}
                  onChange={handleInputChange}
                  placeholder="ex: 100099392"
                />
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div>
            <h2 className="text-xs uppercase text-green-600 font-medium mb-2">Contact Info</h2>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm">Email<span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="text-sm">Phone number<span className="text-red-500">*</span></Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="address" className="text-sm">Address of Record<span className="text-red-500">*</span></Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="secondaryAddress" className="text-sm">Secondary Address</Label>
                <Input
                  id="secondaryAddress"
                  name="secondaryAddress"
                  value={formData.secondaryAddress}
                  onChange={handleInputChange}
                  placeholder="Secondary Address"
                />
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <h2 className="text-xs uppercase text-green-600 font-medium mb-2">Notes</h2>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label htmlFor="customerGroups" className="text-sm">Customer Groups</Label>
                  <span className="text-sm text-gray-400">Select</span>
                </div>
                <Select 
                  onValueChange={(value) => handleSelectChange('customerGroups', value)}
                  value={formData.customerGroups}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="new">New Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Warnings</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="warning1" 
                      checked={formData.warnings.includes('warning1')}
                      onCheckedChange={(checked) => handleCheckboxChange('warning1', checked as boolean)}
                    />
                    <Label htmlFor="warning1">Warning 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="warning2" 
                      checked={formData.warnings.includes('warning2')}
                      onCheckedChange={(checked) => handleCheckboxChange('warning2', checked as boolean)}
                    />
                    <Label htmlFor="warning2">Warning 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="banned" 
                      checked={formData.warnings.includes('banned')}
                      onCheckedChange={(checked) => handleCheckboxChange('banned', checked as boolean)}
                    />
                    <Label htmlFor="banned">Banned</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="notes" className="text-sm">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Notes"
                  className="min-h-20"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label htmlFor="customerSource" className="text-sm">Customer Source</Label>
                  <span className="text-sm text-gray-400">Select</span>
                </div>
                <Select 
                  onValueChange={(value) => handleSelectChange('customerSource', value)}
                  value={formData.customerSource}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="walkIn">Walk-in</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label htmlFor="rewardEligible" className="text-sm">Reward Eligible</Label>
                  <span className="text-sm text-gray-400">Select</span>
                </div>
                <Select 
                  onValueChange={(value) => handleSelectChange('rewardEligible', value)}
                  value={formData.rewardEligible}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label htmlFor="alphaIqLoyalty" className="text-sm">AlphaIQ Loyalty Member</Label>
                  <span className="text-sm text-gray-400">Select</span>
                </div>
                <Select 
                  onValueChange={(value) => handleSelectChange('alphaIqLoyalty', value)}
                  value={formData.alphaIqLoyalty}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="alphaIqLinked" className="text-sm">AlphaIQ Linked</Label>
                <Input
                  id="alphaIqLinked"
                  name="alphaIqLinked"
                  value={formData.alphaIqLinked}
                  onChange={handleInputChange}
                  placeholder="Placeholder"
                />
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div>
            <h2 className="text-xs uppercase text-green-600 font-medium mb-2">Documents</h2>
            
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-md flex items-center">
                <div className="h-10 w-10 bg-amber-100 rounded mr-3 flex-shrink-0">
                  <img src="/lovable-uploads/78bffc90-fc4f-4016-b3f9-1d5706dec54c.png" alt="License" className="h-10 w-10 object-cover rounded" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Full License</p>
                  <p className="text-xs text-gray-500">04/17/2024 | 51:12</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add document
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCreationScreen;
