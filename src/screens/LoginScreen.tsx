
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { loginToTreez, storeAuthToken } from '@/api/treezApi';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call Treez API for authentication
      const response = await loginToTreez({ 
        username: email, 
        password 
      });
      
      if (response.token) {
        // Store the authentication token
        storeAuthToken(response.token);
        
        toast({
          title: "Success",
          description: "Login successful",
        });
        
        // Navigate to store selection
        navigate('/store-selection');
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid response from server",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: error instanceof Error ? error.message : "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md mb-8">
        <h1 className="text-3xl font-bold text-[#295c07] text-center">Treez</h1>
        <p className="text-center text-muted-foreground mt-2">Mobile Customer Manager</p>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl text-center">Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                placeholder="email@treez.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Password Recovery",
                      description: "Please contact your administrator to reset your password.",
                    });
                  }}
                  className="text-sm text-[#295c07] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input 
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#295c07] hover:bg-[#265b07]" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Having trouble? Contact <a href="mailto:support@treez.io" className="text-[#295c07] hover:underline">support@treez.io</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginScreen;
