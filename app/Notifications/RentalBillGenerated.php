<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\RentalBill;

class RentalBillGenerated extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(private RentalBill $rentalBill)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $bill = $this->rentalBill;
        $lease = $bill->lease;
        $unit = $lease->units;

        return(new MailMessage)
            ->subject('New Rental Bill Generated')
            ->greeting('Hello ' . $notifiable->user_name . ',')
            ->line('A new rental bill has been generated for your property.')
            ->line('<strong>Property:</strong> ' . $unit->address . '- Unit ' . $unit->unit_number)
            ->line('<strong>Billing Period: </strong> ' . $bill->billing_date->format('M Y'))
            ->line('<strong>Amount Due: </strong> ₱' . number_format($bill->rent_amount, 2))
            ->line('strong>Due Date: </strong> ' . $bill->due_date->format('F j, Y'))
            ->line('Please ensure payment is made by the due date to avoid late fees.')
            ->action('View Bill Details', url('/tenant/dashboard'))
            ->line('Thank you for being our valued tenant!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
