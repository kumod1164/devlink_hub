"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomAvatar } from "@/components/ui/custom-avatar"
import { CustomBadge } from "@/components/ui/custom-badge"
import { Check, Bell, Star, Award, Shield, Zap, MessageSquare, Users } from "lucide-react"

export default function AvatarShowcase() {
  const [activeTab, setActiveTab] = useState("avatars")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Avatar & Badge Components</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="avatars">Avatars</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="avatars" className="space-y-8">
            {/* Avatar Sizes */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Avatar Sizes</h3>
              <div className="flex flex-wrap items-end gap-4">
                <CustomAvatar size="xs" src="/placeholder.svg?height=24&width=24" alt="User" fallback="JD" />
                <CustomAvatar size="sm" src="/placeholder.svg?height=32&width=32" alt="User" fallback="JD" />
                <CustomAvatar size="md" src="/placeholder.svg?height=40&width=40" alt="User" fallback="JD" />
                <CustomAvatar size="lg" src="/placeholder.svg?height=48&width=48" alt="User" fallback="JD" />
                <CustomAvatar size="xl" src="/placeholder.svg?height=64&width=64" alt="User" fallback="JD" />
                <CustomAvatar size="2xl" src="/placeholder.svg?height=80&width=80" alt="User" fallback="JD" />
              </div>
            </div>

            {/* Avatar Shapes */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Avatar Shapes</h3>
              <div className="flex flex-wrap gap-4">
                <CustomAvatar shape="circle" src="/placeholder.svg?height=40&width=40" alt="User" fallback="JD" />
                <CustomAvatar shape="square" src="/placeholder.svg?height=40&width=40" alt="User" fallback="JD" />
                <CustomAvatar shape="rounded" src="/placeholder.svg?height=40&width=40" alt="User" fallback="JD" />
              </div>
            </div>

            {/* Avatar Borders */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Avatar Borders</h3>
              <div className="flex flex-wrap gap-4">
                <CustomAvatar
                  border="thin"
                  borderColor="default"
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                  fallback="JD"
                />
                <CustomAvatar
                  border="medium"
                  borderColor="primary"
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                  fallback="JD"
                />
                <CustomAvatar
                  border="thick"
                  borderColor="secondary"
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                  fallback="JD"
                />
              </div>
            </div>

            {/* Avatar Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Avatar Status</h3>
              <div className="flex flex-wrap gap-4">
                <CustomAvatar status="online" src="/placeholder.svg?height=40&width=40" alt="User" fallback="JD" />
                <CustomAvatar status="offline" src="/placeholder.svg?height=40&width=40" alt="User" fallback="JD" />
                <CustomAvatar status="busy" src="/placeholder.svg?height=40&width=40" alt="User" fallback="JD" />
                <CustomAvatar status="away" src="/placeholder.svg?height=40&width=40" alt="User" fallback="JD" />
              </div>
            </div>

            {/* Avatar Status Positions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Status Positions</h3>
              <div className="flex flex-wrap gap-4">
                <CustomAvatar
                  status="online"
                  statusPosition="top-right"
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                  fallback="JD"
                />
                <CustomAvatar
                  status="online"
                  statusPosition="bottom-right"
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                  fallback="JD"
                />
                <CustomAvatar
                  status="online"
                  statusPosition="bottom-left"
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                  fallback="JD"
                />
                <CustomAvatar
                  status="online"
                  statusPosition="top-left"
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                  fallback="JD"
                />
              </div>
            </div>

            {/* Avatar Group */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Avatar Group</h3>
              <div className="flex">
                <CustomAvatar
                  group
                  groupIndex={0}
                  border="thin"
                  borderColor="white"
                  src="/placeholder.svg?height=40&width=40"
                  alt="User 1"
                  fallback="JD"
                />
                <CustomAvatar
                  group
                  groupIndex={1}
                  border="thin"
                  borderColor="white"
                  src="/placeholder.svg?height=40&width=40"
                  alt="User 2"
                  fallback="AB"
                />
                <CustomAvatar
                  group
                  groupIndex={2}
                  border="thin"
                  borderColor="white"
                  src="/placeholder.svg?height=40&width=40"
                  alt="User 3"
                  fallback="CD"
                />
                <CustomAvatar
                  group
                  groupIndex={3}
                  border="thin"
                  borderColor="white"
                  src="/placeholder.svg?height=40&width=40"
                  alt="User 4"
                  fallback="EF"
                />
                <CustomAvatar
                  group
                  groupIndex={4}
                  border="thin"
                  borderColor="white"
                  className="bg-teal-500 text-white"
                  fallback="+3"
                />
              </div>
            </div>

            {/* Animated Avatars */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Animated Avatars</h3>
              <div className="flex flex-wrap gap-4">
                <CustomAvatar animated src="/placeholder.svg?height=40&width=40" alt="User" fallback="JD" />
                <CustomAvatar
                  animated
                  status="online"
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                  fallback="JD"
                />
                <CustomAvatar
                  animated
                  border="medium"
                  borderColor="primary"
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                  fallback="JD"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="badges" className="space-y-8">
            {/* Badge Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Badge Variants</h3>
              <div className="flex flex-wrap gap-4">
                <CustomBadge variant="default">Default</CustomBadge>
                <CustomBadge variant="secondary">Secondary</CustomBadge>
                <CustomBadge variant="outline">Outline</CustomBadge>
                <CustomBadge variant="success">Success</CustomBadge>
                <CustomBadge variant="warning">Warning</CustomBadge>
                <CustomBadge variant="danger">Danger</CustomBadge>
                <CustomBadge variant="info">Info</CustomBadge>
                <CustomBadge variant="purple">Purple</CustomBadge>
                <CustomBadge variant="gradient">Gradient</CustomBadge>
              </div>
            </div>

            {/* Badge Sizes */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Badge Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <CustomBadge size="sm">Small</CustomBadge>
                <CustomBadge size="default">Default</CustomBadge>
                <CustomBadge size="lg">Large</CustomBadge>
                <CustomBadge size="icon" dot />
              </div>
            </div>

            {/* Badge Shapes */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Badge Shapes</h3>
              <div className="flex flex-wrap gap-4">
                <CustomBadge rounded="default">Rounded Full</CustomBadge>
                <CustomBadge rounded="md">Rounded Medium</CustomBadge>
                <CustomBadge rounded="lg">Rounded Large</CustomBadge>
              </div>
            </div>

            {/* Badge with Icons */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Badge with Icons</h3>
              <div className="flex flex-wrap gap-4">
                <CustomBadge icon={<Check className="h-3 w-3" />}>Verified</CustomBadge>
                <CustomBadge variant="success" icon={<Check className="h-3 w-3" />}>
                  Completed
                </CustomBadge>
                <CustomBadge variant="warning" icon={<Bell className="h-3 w-3" />}>
                  Notifications
                </CustomBadge>
                <CustomBadge variant="info" icon={<Star className="h-3 w-3" />}>
                  Featured
                </CustomBadge>
                <CustomBadge variant="purple" icon={<Award className="h-3 w-3" />}>
                  Premium
                </CustomBadge>
              </div>
            </div>

            {/* Badge Counters */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Badge Counters</h3>
              <div className="flex flex-wrap gap-4">
                <CustomBadge count={5} />
                <CustomBadge variant="danger" count={12} />
                <CustomBadge variant="info" count={42} />
                <CustomBadge variant="success" count={99} />
                <CustomBadge variant="purple" count={999} />
              </div>
            </div>

            {/* Badge Animations */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Badge Animations</h3>
              <div className="flex flex-wrap gap-4">
                <CustomBadge animation="pulse" variant="danger">
                  Pulse
                </CustomBadge>
                <CustomBadge animation="bounce" variant="success">
                  Bounce
                </CustomBadge>
                <CustomBadge animated variant="info">
                  Animated
                </CustomBadge>
                <CustomBadge animated variant="purple" icon={<Shield className="h-3 w-3" />}>
                  Protected
                </CustomBadge>
              </div>
            </div>

            {/* Badge Use Cases */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Badge Use Cases</h3>
              <div className="flex flex-wrap gap-8">
                <div className="relative">
                  <CustomAvatar size="lg" src="/placeholder.svg?height=48&width=48" alt="User" fallback="JD" />
                  <CustomBadge
                    className="absolute -top-1 -right-1"
                    variant="success"
                    icon={<Check className="h-3 w-3" />}
                    size="sm"
                  />
                </div>

                <div className="relative">
                  <button className="p-2 rounded-md hover:bg-slate-100">
                    <MessageSquare className="h-6 w-6" />
                  </button>
                  <CustomBadge className="absolute -top-1 -right-1" variant="danger" count={5} size="sm" />
                </div>

                <div className="relative">
                  <button className="p-2 rounded-md hover:bg-slate-100">
                    <Users className="h-6 w-6" />
                  </button>
                  <CustomBadge className="absolute -top-1 -right-1" variant="info" dot size="icon" />
                </div>

                <div className="flex items-center gap-2">
                  <span>Premium Plan</span>
                  <CustomBadge variant="gradient" icon={<Zap className="h-3 w-3" />} size="sm">
                    PRO
                  </CustomBadge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
