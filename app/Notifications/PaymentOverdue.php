<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\RentalBill;

class PaymentOverdue extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct( private RentalBill $rentalBill)
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
        $daysOverdue = now()->diffInDays($bill->due_date);

        return(new MailMessage)
        ->subject('URGENT: Rental Payment Overdue')
        ->greeting('Dear ' . $notifiable->user_name . ',')
        ->line('<strong style = "color:#dc3545;">PAYMENT OVERDUE NOTICE</strong>')
        ->line('Your rental payment is now overdue by ' . $daysOverdue . ' days')
        ->line('<strong>Property: </strong> ' . $unit->address . '- Unit ' . $unit->unit_number)
        ->line('<strong>Original Due Date:</strong> ' . $bill->due_date->format('F j, Y'))
        ->line('<strong>Amount Due:</strong> ₱' . number_format($bill->rent_amount - $bill->amount_paid, 2))
        ->line('Please make payment immediately to avoid additional late fees and potential lease termination.')
        ->action('Pay Now', url('/tenant/dashboard'))
        ->line('If you have already made payment, please contact us immediately.');
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
