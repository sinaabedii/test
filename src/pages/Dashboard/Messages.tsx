import React, { useState, useEffect } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  PaperAirplaneIcon, 
  UserIcon,
  XMarkIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

// تایپ پیام
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  isAdmin: boolean;
  content: string;
  createdAt: Date;
  isRead: boolean;
}

// تایپ اطلاعات تیکت
interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'closed' | 'pending';
  lastUpdate: Date;
  messages: Message[];
}

const Messages: React.FC = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [createTicketMode, setCreateTicketMode] = useState(false);

  // بارگذاری تیکت‌ها
  useEffect(() => {
    setLoading(true);
    // شبیه‌سازی دریافت از API
    setTimeout(() => {
      const demoTickets: Ticket[] = [
        {
          id: 'ticket-1',
          subject: 'سوال در مورد نحوه سفارش',
          status: 'closed',
          lastUpdate: new Date(2023, 7, 15),
          messages: [
            {
              id: 'msg-1',
              senderId: user?.id || '1',
              senderName: user?.name || 'کاربر',
              isAdmin: false,
              content: 'سلام، من می‌خواهم یک سفارش عمده انجام دهم اما نمی‌دانم باید چگونه سفارش بدهم. آیا باید از همین سایت اقدام کنم؟',
              createdAt: new Date(2023, 7, 15, 10, 30),
              isRead: true,
            },
            {
              id: 'msg-2',
              senderId: 'admin-1',
              senderName: 'پشتیبانی',
              isAdmin: true,
              content: 'سلام، بله شما می‌توانید از طریق سایت اقدام کنید. کافیست محصولات مورد نظر را به سبد خرید اضافه کنید و تعداد مورد نظر را وارد کنید. سیستم به صورت خودکار تخفیف‌های عمده را اعمال می‌کند.',
              createdAt: new Date(2023, 7, 15, 11, 45),
              isRead: true,
            },
            {
              id: 'msg-3',
              senderId: user?.id || '1',
              senderName: user?.name || 'کاربر',
              isAdmin: false,
              content: 'متوجه شدم، ممنون از راهنمایی شما.',
              createdAt: new Date(2023, 7, 15, 14, 20),
              isRead: true,
            },
          ],
        },
        {
          id: 'ticket-2',
          subject: 'زمان ارسال سفارش',
          status: 'open',
          lastUpdate: new Date(2023, 7, 28),
          messages: [
            {
              id: 'msg-4',
              senderId: user?.id || '1',
              senderName: user?.name || 'کاربر',
              isAdmin: false,
              content: 'سلام، سفارش من با شماره 1000456 در چه زمانی ارسال خواهد شد؟',
              createdAt: new Date(2023, 7, 28, 9, 15),
              isRead: true,
            },
            {
              id: 'msg-5',
              senderId: 'admin-1',
              senderName: 'پشتیبانی',
              isAdmin: true,
              content: 'سلام، سفارش شما در حال آماده‌سازی است و فردا ارسال خواهد شد. کد پیگیری به شماره موبایل شما پیامک خواهد شد.',
              createdAt: new Date(2023, 7, 28, 10, 30),
              isRead: false,
            },
          ],
        },
      ];
      
      setTickets(demoTickets);
      setLoading(false);
    }, 1000);
  }, [user]);

  // ارسال پیام جدید
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeTicket) return;
    
    // در دنیای واقعی، درخواست ارسال پیام به API ارسال می‌شود
    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || '1',
      senderName: user?.name || 'کاربر',
      isAdmin: false,
      content: newMessage,
      createdAt: new Date(),
      isRead: false,
    };
    
    const updatedTicket = {
      ...activeTicket,
      status: 'pending' as const,
      lastUpdate: new Date(),
      messages: [...activeTicket.messages, message],
    };
    
    // به‌روزرسانی تیکت فعال
    setActiveTicket(updatedTicket);
    
    // به‌روزرسانی لیست تیکت‌ها
    const updatedTickets = tickets.map(ticket => 
      ticket.id === activeTicket.id ? updatedTicket : ticket
    );
    
    setTickets(updatedTickets);
    setNewMessage('');
    
    toast.success('پیام شما با موفقیت ارسال شد');
  };

  // ایجاد تیکت جدید
  const handleCreateTicket = () => {
    if (!newTicketSubject.trim() || !newMessage.trim()) return;
    
    // در دنیای واقعی، درخواست ایجاد تیکت به API ارسال می‌شود
    const ticket: Ticket = {
      id: `ticket-${Date.now()}`,
      subject: newTicketSubject,
      status: 'open',
      lastUpdate: new Date(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: user?.id || '1',
          senderName: user?.name || 'کاربر',
          isAdmin: false,
          content: newMessage,
          createdAt: new Date(),
          isRead: false,
        },
      ],
    };
    
    // افزودن تیکت جدید به لیست
    setTickets([ticket, ...tickets]);
    setActiveTicket(ticket);
    setNewTicketSubject('');
    setNewMessage('');
    setCreateTicketMode(false);
    
    toast.success('تیکت جدید با موفقیت ایجاد شد');
  };

  // بستن تیکت
  const handleCloseTicket = () => {
    if (!activeTicket) return;
    
    // در دنیای واقعی، درخواست بستن تیکت به API ارسال می‌شود
    const updatedTicket = {
      ...activeTicket,
      status: 'closed' as const,
    };
    
    // به‌روزرسانی تیکت فعال
    setActiveTicket(updatedTicket);
    
    // به‌روزرسانی لیست تیکت‌ها
    const updatedTickets = tickets.map(ticket => 
      ticket.id === activeTicket.id ? updatedTicket : ticket
    );
    
    setTickets(updatedTickets);
    
    toast.success('تیکت با موفقیت بسته شد');
  };

  // کلاس وضعیت تیکت
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-neutral-100 text-neutral-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  // متن وضعیت تیکت
  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'باز';
      case 'closed':
        return 'بسته شده';
      case 'pending':
        return 'در انتظار پاسخ';
      default:
        return 'نامشخص';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">پیام‌های من</h1>
        <Button 
          onClick={() => {
            setCreateTicketMode(true);
            setActiveTicket(null);
          }}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          ایجاد تیکت جدید
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>در حال بارگذاری...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* لیست تیکت‌ها */}
          <div className="md:col-span-1">
            <Card className="overflow-hidden">
              <div className="p-4 bg-blue-50 border-b border-blue-100">
                <h3 className="font-bold">تیکت‌های من</h3>
              </div>
              <div className="overflow-y-auto max-h-[500px]">
                {tickets.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p>تیکتی وجود ندارد</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {tickets.map(ticket => (
                      <li 
                        key={ticket.id}
                        className={`p-3 hover:bg-gray-50 cursor-pointer ${activeTicket?.id === ticket.id ? 'bg-blue-50' : ''}`}
                        onClick={() => {
                          setActiveTicket(ticket);
                          setCreateTicketMode(false);
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{ticket.subject}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {new Date(ticket.lastUpdate).toLocaleString('fa-IR')}
                            </p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(ticket.status)}`}>
                            {getStatusText(ticket.status)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          </div>

          {/* بخش نمایش پیام‌ها یا ایجاد تیکت جدید */}
          <div className="md:col-span-2">
            {createTicketMode ? (
              // فرم ایجاد تیکت جدید
              <Card>
                <div className="p-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
                  <h3 className="font-bold">ایجاد تیکت جدید</h3>
                  <button 
                    onClick={() => setCreateTicketMode(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">موضوع تیکت</label>
                    <input
                      type="text"
                      value={newTicketSubject}
                      onChange={(e) => setNewTicketSubject(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="موضوع تیکت را وارد کنید"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">پیام شما</label>
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="پیام خود را وارد کنید"
                    />
                  </div>
                  <Button 
                    onClick={handleCreateTicket}
                    className="bg-blue-500 text-white hover:bg-blue-600 w-full"
                    disabled={!newTicketSubject.trim() || !newMessage.trim()}
                  >
                    ایجاد تیکت
                  </Button>
                </div>
              </Card>
            ) : activeTicket ? (
              // نمایش پیام‌های تیکت
              <Card>
                <div className="p-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{activeTicket.subject}</h3>
                    <p className="text-xs mt-1">
                      <span className={`px-2 py-0.5 rounded-full ${getStatusClass(activeTicket.status)}`}>
                        {getStatusText(activeTicket.status)}
                      </span>
                    </p>
                  </div>
                  {activeTicket.status !== 'closed' && (
                    <Button 
                      onClick={handleCloseTicket}
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      بستن تیکت
                    </Button>
                  )}
                </div>
                <div className="p-4 max-h-[400px] overflow-y-auto">
                  {activeTicket.messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`mb-4 flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isAdmin 
                            ? 'bg-gray-100 text-gray-800' 
                            : 'bg-blue-500 text-white'
                        }`}
                      >
                        <div className="flex items-center mb-1">
                          <span className={`text-xs font-medium ${message.isAdmin ? 'text-gray-600' : 'text-blue-100'}`}>
                            {message.senderName}
                          </span>
                        </div>
                        <p>{message.content}</p>
                        <div className="flex justify-end items-center mt-1">
                          <span className={`text-xs ${message.isAdmin ? 'text-gray-500' : 'text-blue-100'}`}>
                            {new Date(message.createdAt).toLocaleString('fa-IR')}
                          </span>
                          {message.isRead && !message.isAdmin && (
                            <CheckCircleIcon className="h-4 w-4 ml-1 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {activeTicket.status !== 'closed' && (
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-md rounded-r-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="پیام خود را وارد کنید"
                        disabled={activeTicket.status === 'closed'}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-blue-500 text-white hover:bg-blue-600 rounded-l-none"
                        disabled={!newMessage.trim() || activeTicket.status === 'closed'}
                      >
                        <PaperAirplaneIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ) : (
              // راهنمای انتخاب تیکت
              <Card className="h-full flex flex-col justify-center items-center p-8 text-center">
                <ChatBubbleLeftRightIcon className="h-16 w-16 text-blue-300 mb-4" />
                <h3 className="text-xl font-bold mb-2">پشتیبانی آنلاین</h3>
                <p className="text-gray-600 mb-6">
                  برای مشاهده گفتگوها، یک تیکت را انتخاب کنید یا یک تیکت جدید ایجاد کنید.
                </p>
                <Button 
                  onClick={() => setCreateTicketMode(true)}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  ایجاد تیکت جدید
                </Button>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;